using mongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.Data.Interfaces
{
    public interface IPlanDetailRepository : IGetAll<PlanDetail>,IGet<PlanDetail,string>, ISave<PlanDetail>, IUpdate<PlanDetail, string>, IDelete<string>
    {
    }
}
