using NSubstitute;
using mongo.Test.Framework;
using mongo.BusinessServices.Services;
using mongo.Data.Interfaces;

namespace mongo.Test.Business.TestServiceSpec
{
    public abstract class UsingTestServiceSpec : SpecFor<TestService>
    {
        protected ITestRepository _testRepository;

        public override void Context()
        {
            _testRepository = Substitute.For<ITestRepository>();
            subject = new TestService(_testRepository);

        }

    }
}