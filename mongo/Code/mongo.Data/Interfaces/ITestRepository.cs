using mongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.Data.Interfaces
{
    public interface ITestRepository : IGetAll<Test>,IGet<Test,string>, ISave<Test>, IUpdate<Test, string>, IDelete<string>
    {
    }
}
