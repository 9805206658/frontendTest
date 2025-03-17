import Style from  "../payment/payment.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import { useLocation } from "react-router-dom";
import Footer from "../footer/footer";
const CreatePaymentEle=({type, name, value, extraField, labelName, register})=>{
    return( 
        <div className={Style.paymentEleContainer}>
            {labelName && <label htmlFor={name}>{labelName}:</label>}
            <input type={type} name={name} id={name} value={value || ""} {...extraField} {...register(name)} />
        </div> 
    );
 };
 

const schema = yup.object().shape({
    amount: yup.string().required(),
    taxAmount: yup.string().required(),
    totalAmount: yup.string().required(),
    transactionUuid: yup.string().required(),
    productCode: yup.string().required(),
    productServiceCharge: yup.string().required(),
    productDeliveryCharge: yup.string().required(),
    successUrl: yup.string().required(),
    failureUrl: yup.string().required(),
    userId:yup.string().required(),
});


const PaymentDetail = () => {
    const location = useLocation();
    const { subTotal, total, charge,tax} = location.state.paymentDetail;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    function generateTransactionUUID(prefix = "11", counter = 201) {
        const randomSuffix = Math.floor(Math.random() * (1000-10) ) + 10; 
        return `${prefix}-${counter}-${randomSuffix}`;
    }

    const transactionUuid = generateTransactionUUID();
    
    const formSubmit = async (formData) => {
        console.log("Form Data:", formData);
        try {
            const res = await axiosClient.post('/pay', formData);
            // creating the element
            const div = document.createElement("div");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.getElementById("epayForm").submit();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={Style.paymentPage}>
                <form className={Style.wholePaymentWrapper} onSubmit={handleSubmit(formSubmit)}>
                    <h1>Payment Detail</h1>
                    <CreatePaymentEle type="text" labelName="Amount" name="amount" value={subTotal} register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Tax Amount" name="taxAmount" value={tax} register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Product Delivery Charge" name="productDeliveryCharge" value={charge} register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Total Amount" name="totalAmount" value={total} register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Transaction UUID" name="transactionUuid" value={transactionUuid} register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Product Code" name="productCode" value="EPAYTEST" register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="Product Service Charge" name="productServiceCharge" value="0" register={register} extraField={{ readOnly: true }} errors={errors} />
                    <CreatePaymentEle type="text" name="successUrl" value={`${import.meta.env.VITE_TEST_URL}/success`} register={register} extraField={{ readOnly: true, hidden: true }} errors={errors} />
                    <CreatePaymentEle type="text" name="failureUrl" value={`${import.meta.env.VITE_TEST_URL}/failure`} register={register} extraField={{ readOnly: true, hidden: true }} errors={errors} />
                    <CreatePaymentEle type="text" labelName="User Id" name="userId" value={localStorage.getItem('id')} register={register} extraField={{ readOnly: true }} errors={errors} />


                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default PaymentDetail;

