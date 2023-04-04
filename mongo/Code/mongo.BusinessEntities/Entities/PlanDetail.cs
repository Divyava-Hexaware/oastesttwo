using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace mongo.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class PlanDetail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string PharmacyCostType  { get; set; }
        public int DrugTier  { get; set; }
        public string DrugTierCaption  { get; set; }
        public string DaysSupply  { get; set; }
        public int CostAmount  { get; set; }
        public int CostPercentage  { get; set; }
        public int MinAmount  { get; set; }
        public int MaxAmount  { get; set; }
        public bool Is31DaySupply  { get; set; }
        public string DrugCategory  { get; set; }
        public string SubCategory  { get; set; }
        
    }

}
