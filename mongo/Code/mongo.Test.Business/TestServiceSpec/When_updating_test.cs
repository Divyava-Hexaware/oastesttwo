using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using mongo.BusinessEntities.Entities;


namespace mongo.Test.Business.TestServiceSpec
{
    public class When_updating_test : UsingTestServiceSpec
    {
        private Test _result;
        private Test _test;

        public override void Context()
        {
            base.Context();

            _test = new Test
            {
                uname = "uname",
                pwd = "pwd",
                confirm = true
            };

            _testRepository.Update(_test.Id, _test).Returns(_test);
            
        }
        public override void Because()
        {
            _result = subject.Update(_test.Id, _test);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _testRepository.Received(1).Update(_test.Id, _test);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Test>();

            _result.ShouldBe(_test);
        }
    }
}