const graphql = require('graphql');
const Location = require('./mongoSchema/location')
const SoundBite = require('./mongoSchema/soundbite')

const { GraphQLObjectType, GraphQLString,
      GraphQLID, GraphQLSchema, GraphQLList,
      GraphQLNonNull } = graphql;

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        soundBiteIDs: {
            type: new GraphQLList(SoundBiteType),
            resolve(parent, args) {
                return SoundBite.find({ locMarkerID: parent.id });
            }
        }
    })
})

const SoundBiteType = new GraphQLObjectType({
    name: 'SoundBite',
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        avgDecibel: { type: GraphQLString },
        locMarkerID: { type: GraphQLID }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Location.findById(args.id);
            }
        },
        soundBite: {
            type: SoundBiteType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return SoundBite.findById(args.id);
            }
        },
        getAllLocations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args) {
                return Location.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSoundBite: {
            type: SoundBiteType,
            args: {
                soundAddress: { type: new GraphQLNonNull(GraphQLString) },
                avgDecibel: { type: new GraphQLNonNull(GraphQLString) },
                locationMarker: { type: new GraphQLNonNull(GraphQLID) } //location marker for nearst location
            },
            resolve(parent, args) {
                let sb = new SoundBite({
                    address: args.soundAddress,
                    avgDecibel: args.avgDecibel,
                    locMarkerID: args.locationMarker
                });
                return sb.save();
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                address: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let loc = new Location({
                    address: args.address
                });
                return loc.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});