using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace mongo.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class Test
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string uname  { get; set; }
        public string pwd  { get; set; }
        public bool confirm  { get; set; }
        
    }

}
