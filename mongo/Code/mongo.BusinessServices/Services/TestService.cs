using mongo.BusinessServices.Interfaces;
using mongo.Data.Interfaces;
using mongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.BusinessServices.Services
{
    public class TestService : ITestService
    {
        readonly ITestRepository _TestRepository;

        public TestService(ITestRepository TestRepository)
        {
           this._TestRepository = TestRepository;
        }
        public IEnumerable<Test> GetAll()
        {
            return _TestRepository.GetAll();
        }

        public Test Get(string id)
        {
            return _TestRepository.Get(id);
        }

        public Test Save(Test test)
        {
            _TestRepository.Save(test);
            return test;
        }

        public Test Update(string id, Test test)
        {
            return _TestRepository.Update(id, test);
        }

        public bool Delete(string id)
        {
            return _TestRepository.Delete(id);
        }

    }
}
