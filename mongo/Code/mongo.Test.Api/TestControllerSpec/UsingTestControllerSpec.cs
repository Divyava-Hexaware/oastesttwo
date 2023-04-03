using NSubstitute;
using mongo.Test.Framework;
using mongo.Api.Controllers;
using mongo.BusinessServices.Interfaces;
using AutoMapper;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;


namespace mongo.Test.Api.TestControllerSpec
{
    public abstract class UsingTestControllerSpec : SpecFor<TestController>
    {
        protected ITestService _testService;
        protected IMapper _mapper;

        public override void Context()
        {
            _testService = Substitute.For<ITestService>();
            _mapper = Substitute.For<IMapper>();
            subject = new TestController(_testService,_mapper);

        }

    }
}
