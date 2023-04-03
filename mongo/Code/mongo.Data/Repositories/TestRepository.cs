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
    public class TestRepository : ITestRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "Test";

        public TestRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Test> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Test>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Test Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Test>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Test entity)
        {
            _gateway.GetMongoDB().GetCollection<Test>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Test Update(string id, Test entity)
        {
            var update = Builders<Test>.Update
                .Set(e => e.uname, entity.uname )
                .Set(e => e.pwd, entity.pwd )
                .Set(e => e.confirm, entity.confirm );

            var result = _gateway.GetMongoDB().GetCollection<Test>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Test>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
