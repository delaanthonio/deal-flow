import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import styles from '../../styles/Form.module.css'

const validationSchema = Yup.object().shape({
  closingCost: Yup.number().min(2).required('Required'),
  investorProfitShare: Yup.number()
    .min(50, 'Must by at least 50%')
    .max(100, 'Cannot be over 100%')
    .required('Required'),
  investmentDuration: Yup.number()
    .min(1, 'Must be at least 1 month')
    .max(60, 'Must be at most 60 months')
    .required('Required'),
  projectedSalePrice: Yup.number().min(0, 'Must be at least 0').required('Required'),
  purchasePrice: Yup.number().min(0, 'Must be at least 0').required('Required'),
  region: Yup.string().required('Required'),
  rennovationCost: Yup.number().min(0, 'Must be at least 0').required('Required'),
  subRegion: Yup.string().required('Required'),
})

interface LabeledFieldProps {
  name: string
  title: string
  placeholder?: string
}

interface DisplayFieldProps {
  name: string
  title: string
  value: string
}

const LabeledField = (props: LabeledFieldProps) => {
  return (
    <div className={styles.input_field}>
      <label className="field-title" htmlFor={props.name}>
        {props.title}
      </label>
      <Field className="deal-input-box" {...props}></Field>
      <ErrorMessage name={props.name} />
    </div>
  )
}

const DisplayField = (props: DisplayFieldProps) => {
  return (
    <div className={styles.input_field}>
      <label className="field-title">{props.title}</label>
      <span className="display-value"> {props.value}</span>
      <ErrorMessage name={props.name} />
    </div>
  )
}

export const RealEstateRennovation = () => {
  return (
    <div>
      <Formik
        initialValues={{
          closingCost: '',
          investmentDuration: '',
          investorProfitShare: '50',
          projectedSalePrice: '',
          purchasePrice: '',
          region: '',
          renovationCost: '',
          subRegion: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {props => {
          const projectedSalePrice = parseInt(props.values.projectedSalePrice) || 0
          const purchasePrice = parseInt(props.values.purchasePrice) || 0
          const closingCost = parseInt(props.values.closingCost) || 0
          const rennovationCost = parseInt(props.values.renovationCost) || 0
          const amountRequested = purchasePrice + rennovationCost
          const displayAmountRequested = `$${amountRequested}`
          const investorProfitShare = parseInt(props.values.investorProfitShare)
          const projectedProfit = Math.max(
            projectedSalePrice - amountRequested - closingCost,
            0,
          )
          const returnOnInvestment = Math.max(
            ((projectedProfit / amountRequested) * investorProfitShare) / 100,
            0,
          )

          const displayReturnOnInvestment = returnOnInvestment.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 0,
          })
          const profitToInvestor = Math.max(
            (projectedProfit * investorProfitShare) / 100,
            0,
          )
          const displayProfitToInvestor = `$${profitToInvestor}`

          const investmentDuration = parseInt(props.values.investmentDuration)
          const annualizedReturn =
            (1 + returnOnInvestment) ** (12 / investmentDuration) - 1
          const displayAnnualizedReturn = annualizedReturn.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 0,
          })
          return (
            <Form className={styles.deal_form}>
              <h1>Real Estate Renovation Deal</h1>

              <h3 className={styles.section_header}>Deal Details</h3>
              <div className={styles.deal_form_section}>
                <LabeledField
                  name="title"
                  title="Title"
                  placeholder="My Real Estate Deal"
                />
                <LabeledField name="purchasePrice" title="Purchase Price" />
                <LabeledField name="closingCost" title="Closing Cost" />
                <LabeledField name="renovationCost" title="Renovation Cost" />

                <LabeledField name="projectedSalePrice" title="Projected Sale Price" />
                <LabeledField
                  name="investmentDuration"
                  title="Investment Duration (Months)"
                />
                <LabeledField name="investorProfitShare" title="Investor Profit Share" />
              </div>

              <h3 className={styles.section_header}>Deal Summary</h3>
              <div className={styles.deal_form_section}>
                <DisplayField
                  name="amountRequested"
                  title="Amount Requested"
                  value={displayAmountRequested}
                />
                <DisplayField
                  name="profitToInvestor"
                  title="Profit"
                  value={displayProfitToInvestor}
                />
                <DisplayField
                  name="returnOnInvestment"
                  title="Return"
                  value={returnOnInvestment ? displayReturnOnInvestment : '0%'}
                />
                <DisplayField
                  name="annualizedReturn"
                  title="Annualized Return"
                  value={annualizedReturn ? displayAnnualizedReturn : '0%'}
                />
              </div>

              <h3 className={styles.section_header}>Additional Information</h3>
              <div className={styles.deal_form_section}>
                <LabeledField name="region" title="Country" placeholder="United States" />
                <LabeledField
                  name="subRegion"
                  title="State / Province"
                  placeholder="Florida"
                />
              </div>

              <button type="submit" disabled={props.isSubmitting}>
                Submit
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RealEstateRennovation
