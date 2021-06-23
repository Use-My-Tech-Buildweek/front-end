import * as yup from 'yup'

const schema = yup.object().shape({
    itemName: yup.string().required('A name is required').min(3, "the item's name must be at least 3 characters long"),
    itemDescription: yup
        .string()
        .required(),
    
    itemPrice: yup
        .number()
        .required('Price is required')
});

export default schema