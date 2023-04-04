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

namespace mongo.Test.Api.PlanDetailControllerSpec
{
    public class When_updating_plandetail : UsingPlanDetailControllerSpec
    {
        private ActionResult<PlanDetailDto > _result;
        private PlanDetail _plandetail;
        private PlanDetailDto _plandetailDto;

        public override void Context()
        {
            base.Context();

            _plandetail = new PlanDetail
            {
                PharmacyCostType = "PharmacyCostType",
                DrugTier = 25,
                DrugTierCaption = "DrugTierCaption",
                DaysSupply = "DaysSupply",
                CostAmount = 33,
                CostPercentage = 7,
                MinAmount = 4,
                MaxAmount = 45,
                Is31DaySupply = true,
                DrugCategory = "DrugCategory",
                SubCategory = "SubCategory"
            };

            _plandetailDto = new PlanDetailDto{
                    PharmacyCostType = "PharmacyCostType",
                    DrugTier = 45,
                    DrugTierCaption = "DrugTierCaption",
                    DaysSupply = "DaysSupply",
                    CostAmount = 38,
                    CostPercentage = 31,
                    MinAmount = 5,
                    MaxAmount = 35,
                    Is31DaySupply = false,
                    DrugCategory = "DrugCategory",
                    SubCategory = "SubCategory"
            };

            _plandetailService.Update(_plandetail.Id, _plandetail).Returns(_plandetail);
            _mapper.Map<PlanDetailDto>(_plandetail).Returns(_plandetailDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_plandetail.Id, _plandetail);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _plandetailService.Received(1).Update(_plandetail.Id, _plandetail);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<PlanDetailDto>();

            var resultList = resultListObject as PlanDetailDto;

            resultList.ShouldBe(_plandetailDto);
        }
    }
}