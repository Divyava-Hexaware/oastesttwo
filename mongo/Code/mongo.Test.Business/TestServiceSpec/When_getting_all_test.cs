using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using mongo.BusinessEntities.Entities;

namespace mongo.Test.Business.TestServiceSpec
{
    public class When_getting_all_test : UsingTestServiceSpec
    {
        private IEnumerable<Test> _result;

        private IEnumerable<Test> _all_test;
        private Test _test;

        public override void Context()
        {
            base.Context();

            _test = new Test{
                uname = "uname",
                pwd = "pwd",
                confirm = false
            };

            _all_test = new List<Test> { _test};
            _testRepository.GetAll().Returns(_all_test);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _testRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Test>>();

            List<Test> resultList = _result as List<Test>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_test);
        }
    }
}