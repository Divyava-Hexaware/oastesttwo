using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;

namespace mongo.Test.Api.TestControllerSpec
{
    public class When_getting_all_test : UsingTestControllerSpec
    {
        private ActionResult<IEnumerable<TestDto>> _result;

        private IEnumerable<Test> _all_test;
        private Test _test;

        private IEnumerable<TestDto>  _all_testDto;
        private TestDto _testDto;
    

        public override void Context()
        {
            base.Context();

            _test = new Test{
                uname = "uname",
                pwd = "pwd",
                confirm = false
            };

            _testDto = new TestDto{
                    uname = "uname",
                    pwd = "pwd",
                    confirm = false
                };

            _all_test = new List<Test> { _test};
            _testService.GetAll().Returns(_all_test);
            _all_testDto  = new List<TestDto> {_testDto};
            _mapper.Map<IEnumerable<TestDto>>(_all_test).Returns( _all_testDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _testService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<TestDto>>();

            List<TestDto> resultList = resultListObject as List<TestDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_testDto);
        }
    }
}