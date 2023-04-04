const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditPlanDetail from '../EditPlanDetail'
import { PlanDetailAdded } from '../store/PlanDetailSlice'
beforeAll(() => {
    store.dispatch(
        PlanDetailAdded({
            id: 1,
            PharmacyCostType: 'PharmacyCostType',
            DrugTier: 8,
            DrugTierCaption: 'DrugTierCaption',
            DaysSupply: 'DaysSupply',
            CostAmount: 6,
            CostPercentage: 45,
            MinAmount: 13,
            MaxAmount: 82,
            Is31DaySupply: true,
            DrugCategory: 'DrugCategory',
            SubCategory: 'SubCategory',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="PlanDetail/edit/1" replace />
                                }
                            />
                            <Route
                                path="PlanDetail/edit/:id"
                                element={<EditPlanDetail />}
                            />
                        </Routes>
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

describe('testing view of PlanDetailEdit Component', () => {
    test('should render EditPlanDetail and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const savePlanDetailButtonElement = screen.getByRole('button', {
            name: /save/i,
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

        expect(savePlanDetailButtonElement).toBeInTheDocument()

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

    test('should be able to give inputs to all fields of PlanDetail edit form', async () => {
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
        fireEvent.change(DrugTierElement, { target: { value: 6 } })
        fireEvent.change(DrugTierCaptionElement, {
            target: { value: 'DrugTierCaption' },
        })
        fireEvent.change(DaysSupplyElement, { target: { value: 'DaysSupply' } })
        fireEvent.change(CostAmountElement, { target: { value: 17 } })
        fireEvent.change(CostPercentageElement, { target: { value: 23 } })
        fireEvent.change(MinAmountElement, { target: { value: 99 } })
        fireEvent.change(MaxAmountElement, { target: { value: 31 } })
        fireEvent.change(DrugCategoryElement, {
            target: { value: 'DrugCategory' },
        })
        fireEvent.change(SubCategoryElement, {
            target: { value: 'SubCategory' },
        })

        expect(PharmacyCostTypeElement.value).toBe('PharmacyCostType')

        expect(DrugTierElement.value).toBe(6)
        expect(DrugTierCaptionElement.value).toBe('DrugTierCaption')

        expect(DaysSupplyElement.value).toBe('DaysSupply')

        expect(CostAmountElement.value).toBe(17)
        expect(CostPercentageElement.value).toBe(23)
        expect(MinAmountElement.value).toBe(99)
        expect(MaxAmountElement.value).toBe(31)
        expect(DrugCategoryElement.value).toBe('DrugCategory')

        expect(SubCategoryElement.value).toBe('SubCategory')

        fireEvent.mouseDown(Is31DaySupplyElement)
        const Is31DaySupplylistbox = within(screen.getByRole('listbox'))
        fireEvent.click(Is31DaySupplylistbox.getByText(/False/))
        expect(Is31DaySupplyElement).toHaveTextContent(/False/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const PharmacyCostTypeElement =
            screen.getByLabelText(/PharmacyCostType/i)
        const DrugTierElement = screen.getByLabelText(/DrugTier/i)
        const DrugTierCaptionElement = screen.getByLabelText(/DrugTierCaption/i)
        const DaysSupplyElement = screen.getByLabelText(/DaysSupply/i)
        const CostAmountElement = screen.getByLabelText(/CostAmount/i)
        const CostPercentageElement = screen.getByLabelText(/CostPercentage/i)
        const MinAmountElement = screen.getByLabelText(/MinAmount/i)
        const MaxAmountElement = screen.getByLabelText(/MaxAmount/i)
        const DrugCategoryElement = screen.getByLabelText(/DrugCategory/i)
        const SubCategoryElement = screen.getByLabelText(/SubCategory/i)

        fireEvent.change(PharmacyCostTypeElement, { target: { value: '' } })
        fireEvent.change(DrugTierElement, { target: { value: '' } })
        fireEvent.change(DrugTierCaptionElement, { target: { value: '' } })
        fireEvent.change(DaysSupplyElement, { target: { value: '' } })
        fireEvent.change(CostAmountElement, { target: { value: '' } })
        fireEvent.change(CostPercentageElement, { target: { value: '' } })
        fireEvent.change(MinAmountElement, { target: { value: '' } })
        fireEvent.change(MaxAmountElement, { target: { value: '' } })
        fireEvent.change(DrugCategoryElement, { target: { value: '' } })
        fireEvent.change(SubCategoryElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const savePlanDetailButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(savePlanDetailButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(10)
    })
})
