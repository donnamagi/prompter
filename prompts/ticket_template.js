export const template = `Task: Create a ticket for our product backlog.

Context (Input):
The product is about: {product_description}

The ticket is about: {ticket_description}

Persona: Imagine you are a product manager 

Format:

1. Summary Sentence:
    - one short summary sentence of the ticket.
    - Formulate it as the task already is done and was implemented.
    - Use as view words as possible.
    - Example: "Background scrolling for Website is working reliably”
2. User Story
    - use this format: "As a user, I want to <action>, so that <value>"
    - Follow the INVEST framework: Independent, Negotiable, Valuable, Estimable, Small, and Testable.
3. Description (detailed, on point, in bullet points and with using the least amount of words as possible)
    - What are you building and why. Explain the title in more detail and give more context.
    - In my user stories, I use the headings “What” and “Why” to make it as clear as possible
4. Acceptance Criteria (detailed, on point, in bullet points and with using the least amount of words as possible)
    - A list of requirements from the users perspective.`
