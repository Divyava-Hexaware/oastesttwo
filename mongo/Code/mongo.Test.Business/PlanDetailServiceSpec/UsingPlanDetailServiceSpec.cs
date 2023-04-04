using NSubstitute;
using mongo.Test.Framework;
using mongo.BusinessServices.Services;
using mongo.Data.Interfaces;

namespace mongo.Test.Business.PlanDetailServiceSpec
{
    public abstract class UsingPlanDetailServiceSpec : SpecFor<PlanDetailService>
    {
        protected IPlanDetailRepository _plandetailRepository;

        public override void Context()
        {
            _plandetailRepository = Substitute.For<IPlanDetailRepository>();
            subject = new PlanDetailService(_plandetailRepository);

        }

    }
}