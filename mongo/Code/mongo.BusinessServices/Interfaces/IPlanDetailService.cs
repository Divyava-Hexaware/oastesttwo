using mongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mongo.BusinessServices.Interfaces
{
    public interface IPlanDetailService
    {      
        IEnumerable<PlanDetail> GetAll();
        PlanDetail Get(string id);
        PlanDetail Save(PlanDetail plandetail);
        PlanDetail Update(string id, PlanDetail plandetail);
        bool Delete(string id);

    }
}
