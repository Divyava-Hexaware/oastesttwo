using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using mongo.BusinessEntities.Entities;

namespace mongo.Test.Business.PlanDetailServiceSpec
{
    public class When_getting_all_plandetail : UsingPlanDetailServiceSpec
    {
        private IEnumerable<PlanDetail> _result;

        private IEnumerable<PlanDetail> _all_plandetail;
        private PlanDetail _plandetail;

        public override void Context()
        {
            base.Context();

            _plandetail = new PlanDetail{
                PharmacyCostType = "PharmacyCostType",
                DrugTier = 48,
                DrugTierCaption = "DrugTierCaption",
                DaysSupply = "DaysSupply",
                CostAmount = 22,
                CostPercentage = 1,
                MinAmount = 53,
                MaxAmount = 14,
                Is31DaySupply = false,
                DrugCategory = "DrugCategory",
                SubCategory = "SubCategory"
            };

            _all_plandetail = new List<PlanDetail> { _plandetail};
            _plandetailRepository.GetAll().Returns(_all_plandetail);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _plandetailRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<PlanDetail>>();

            List<PlanDetail> resultList = _result as List<PlanDetail>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_plandetail);
        }
    }
}