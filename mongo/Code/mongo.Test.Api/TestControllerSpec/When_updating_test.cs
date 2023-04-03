using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;
using mongo.BusinessServices.Services;

namespace mongo.Test.Api.TestControllerSpec
{
    public class When_updating_test : UsingTestControllerSpec
    {
        private ActionResult<TestDto > _result;
        private Test _test;
        private TestDto _testDto;

        public override void Context()
        {
            base.Context();

            _test = new Test
            {
                uname = "uname",
                pwd = "pwd",
                confirm = false
            };

            _testDto = new TestDto{
                    uname = "uname",
                    pwd = "pwd",
                    confirm = false
            };

            _testService.Update(_test.Id, _test).Returns(_test);
            _mapper.Map<TestDto>(_test).Returns(_testDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_test.Id, _test);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _testService.Received(1).Update(_test.Id, _test);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<TestDto>();

            var resultList = resultListObject as TestDto;

            resultList.ShouldBe(_testDto);
        }
    }
}