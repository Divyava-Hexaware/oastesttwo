const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddPlanDetail from '../AddPlanDetail'

beforeEach(() => {
    const endPoint = 'PlanDetail'
    const getStudentListResponse = [
        {
            id: 1,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 34,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 95,
            CostPercentage: 46,
            MinAmount: 67,
            MaxAmount: 61,
            Is31DaySupply: true,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddPlanDetail />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view PlanDetailAdd Component', () => {
    test('should render AddPlanDetail and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addPlanDetailButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const PharmacyCostTypeElement =
            screen.getByLabelText(/PharmacyCostType/i)
        const DrugTierElement = screen.getByLabelText(/DrugTier/i)
        const DrugTierCaptionElement = screen.getByLabelText(/DrugTierCaption/i)
        const DaysSupplyElement = screen.getByLabelText(/DaysSupply/i)
        const CostAmountElement = screen.getByLabelText(/CostAmount/i)
        const CostPercentageElement = screen.getByLabelText(/CostPercentage/i)
        const MinAmountElement = screen.getByLabelText(/MinAmount/i)
        const MaxAmountElement = screen.getByLabelText(/MaxAmount/i)
        const Is31DaySupplyElement = screen.getByLabelText(/Is31DaySupply/i)
        const DrugCategoryElement = screen.getByLabelText(/DrugCategory/i)
        const SubCategoryElement = screen.getByLabelText(/SubCategory/i)

        expect(addPlanDetailButtonElement).toBeInTheDocument()

        expect(PharmacyCostTypeElement).toBeInTheDocument()
        expect(DrugTierElement).toBeInTheDocument()
        expect(DrugTierCaptionElement).toBeInTheDocument()
        expect(DaysSupplyElement).toBeInTheDocument()
        expect(CostAmountElement).toBeInTheDocument()
        expect(CostPercentageElement).toBeInTheDocument()
        expect(MinAmountElement).toBeInTheDocument()
        expect(MaxAmountElement).toBeInTheDocument()
        expect(Is31DaySupplyElement).toBeInTheDocument()
        expect(DrugCategoryElement).toBeInTheDocument()
        expect(SubCategoryElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of PlanDetail add form', async () => {
        const PharmacyCostTypeElement =
            screen.getByLabelText(/PharmacyCostType/i)
        const DrugTierElement = screen.getByLabelText(/DrugTier/i)
        const DrugTierCaptionElement = screen.getByLabelText(/DrugTierCaption/i)
        const DaysSupplyElement = screen.getByLabelText(/DaysSupply/i)
        const CostAmountElement = screen.getByLabelText(/CostAmount/i)
        const CostPercentageElement = screen.getByLabelText(/CostPercentage/i)
        const MinAmountElement = screen.getByLabelText(/MinAmount/i)
        const MaxAmountElement = screen.getByLabelText(/MaxAmount/i)
        const Is31DaySupplyElement = screen.getByLabelText(/Is31DaySupply/i)
        const DrugCategoryElement = screen.getByLabelText(/DrugCategory/i)
        const SubCategoryElement = screen.getByLabelText(/SubCategory/i)

        fireEvent.change(PharmacyCostTypeElement, {
            target: { value: 'PharmacyCostType' },
        })
        fireEvent.change(DrugTierElement, { target: { value: 16 } })
        fireEvent.change(DrugTierCaptionElement, {
            target: { value: 'DrugTierCaption' },
        })
        fireEvent.change(DaysSupplyElement, { target: { value: 'DaysSupply' } })
        fireEvent.change(CostAmountElement, { target: { value: 87 } })
        fireEvent.change(CostPercentageElement, { target: { value: 46 } })
        fireEvent.change(MinAmountElement, { target: { value: 4 } })
        fireEvent.change(MaxAmountElement, { target: { value: 94 } })
        fireEvent.change(DrugCategoryElement, {
            target: { value: 'DrugCategory' },
        })
        fireEvent.change(SubCategoryElement, {
            target: { value: 'SubCategory' },
        })

        fireEvent.mouseDown(Is31DaySupplyElement)
        const Is31DaySupplylistbox = within(screen.getByRole('listbox'))
        fireEvent.click(Is31DaySupplylistbox.getByText(/True/))
        expect(Is31DaySupplyElement).toHaveTextContent(/True/i)
    })

    test('should return error message when add PlanDetail button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addPlanDetailButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addPlanDetailButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(11)
    })
})
