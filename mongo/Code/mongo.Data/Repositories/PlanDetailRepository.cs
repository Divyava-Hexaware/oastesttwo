using mongo.Data.Interfaces;
using mongo.BusinessEntities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.Data.Repositories
{
    public class PlanDetailRepository : IPlanDetailRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "PlanDetail";

        public PlanDetailRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<PlanDetail> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<PlanDetail>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public PlanDetail Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<PlanDetail>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(PlanDetail entity)
        {
            _gateway.GetMongoDB().GetCollection<PlanDetail>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public PlanDetail Update(string id, PlanDetail entity)
        {
            var update = Builders<PlanDetail>.Update
                .Set(e => e.PharmacyCostType, entity.PharmacyCostType )
                .Set(e => e.DrugTier, entity.DrugTier )
                .Set(e => e.DrugTierCaption, entity.DrugTierCaption )
                .Set(e => e.DaysSupply, entity.DaysSupply )
                .Set(e => e.CostAmount, entity.CostAmount )
                .Set(e => e.CostPercentage, entity.CostPercentage )
                .Set(e => e.MinAmount, entity.MinAmount )
                .Set(e => e.MaxAmount, entity.MaxAmount )
                .Set(e => e.Is31DaySupply, entity.Is31DaySupply )
                .Set(e => e.DrugCategory, entity.DrugCategory )
                .Set(e => e.SubCategory, entity.SubCategory );

            var result = _gateway.GetMongoDB().GetCollection<PlanDetail>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<PlanDetail>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
