using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;

namespace mongo.Test.Api.PlanDetailControllerSpec
{
    public class When_getting_all_plandetail : UsingPlanDetailControllerSpec
    {
        private ActionResult<IEnumerable<PlanDetailDto>> _result;

        private IEnumerable<PlanDetail> _all_plandetail;
        private PlanDetail _plandetail;

        private IEnumerable<PlanDetailDto>  _all_plandetailDto;
        private PlanDetailDto _plandetailDto;
    

        public override void Context()
        {
            base.Context();

            _plandetail = new PlanDetail{
                PharmacyCostType = "PharmacyCostType",
                DrugTier = 73,
                DrugTierCaption = "DrugTierCaption",
                DaysSupply = "DaysSupply",
                CostAmount = 16,
                CostPercentage = 82,
                MinAmount = 85,
                MaxAmount = 57,
                Is31DaySupply = true,
                DrugCategory = "DrugCategory",
                SubCategory = "SubCategory"
            };

            _plandetailDto = new PlanDetailDto{
                    PharmacyCostType = "PharmacyCostType",
                    DrugTier = 59,
                    DrugTierCaption = "DrugTierCaption",
                    DaysSupply = "DaysSupply",
                    CostAmount = 79,
                    CostPercentage = 61,
                    MinAmount = 69,
                    MaxAmount = 9,
                    Is31DaySupply = true,
                    DrugCategory = "DrugCategory",
                    SubCategory = "SubCategory"
                };

            _all_plandetail = new List<PlanDetail> { _plandetail};
            _plandetailService.GetAll().Returns(_all_plandetail);
            _all_plandetailDto  = new List<PlanDetailDto> {_plandetailDto};
            _mapper.Map<IEnumerable<PlanDetailDto>>(_all_plandetail).Returns( _all_plandetailDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _plandetailService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<PlanDetailDto>>();

            List<PlanDetailDto> resultList = resultListObject as List<PlanDetailDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_plandetailDto);
        }
    }
}