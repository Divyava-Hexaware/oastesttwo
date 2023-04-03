using mongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.BusinessServices.Interfaces
{
    public interface ITestService
    {      
        IEnumerable<Test> GetAll();
        Test Get(string id);
        Test Save(Test test);
        Test Update(string id, Test test);
        bool Delete(string id);

    }
}
