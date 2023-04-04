using NSubstitute;
using mongo.Test.Framework;
using mongo.Api.Controllers;
using mongo.BusinessServices.Interfaces;
using AutoMapper;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;


namespace mongo.Test.Api.PlanDetailControllerSpec
{
    public abstract class UsingPlanDetailControllerSpec : SpecFor<PlanDetailController>
    {
        protected IPlanDetailService _plandetailService;
        protected IMapper _mapper;

        public override void Context()
        {
            _plandetailService = Substitute.For<IPlanDetailService>();
            _mapper = Substitute.For<IMapper>();
            subject = new PlanDetailController(_plandetailService,_mapper);

        }

    }
}
