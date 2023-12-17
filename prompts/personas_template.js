export const template= `Imagine you are a product manager and need to generate User Personas. Think about who could use the described product. Generate the table with the following columns and rows.

The product is about: {product_desc}

Definitely consider the following personas (but think of more relevant ones): {sample_personas}

Columns: 

- Overview
- Quote
- Story
- Needs
- Goals
- Fears
- Pains
    - What is the pain point?
- Responsibilities
- Willingness to pay
    - Estimate there Willingness to pay
- Ease of reaching the persona
    - Estimate the of reaching
- Frequency of using the product
    - Estimate the frequency of using the product
- Addressable size of target user
    - Estimate the addressable size of target user
    - Use the TAM, SAM, SOM framework
- Chanel to reach them
    - best case easily scaleable through automation
    - give every channel a score how scalable they are

Rows:

- User Persona 1
- User Persona 2
- User Persona 3
- User Persona 4
- User Persona 5
- [Additional User Persona]

Note: Think it really through. Ask yourself who will be the main customer of this product. Be very detailed and to the point.
`;
