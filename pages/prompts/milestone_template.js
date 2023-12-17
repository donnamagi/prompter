export const template = `Fill out this milestone template for a project. Imagine you are a senior project manager overseeing this specific milestone in a larger project.

Context:

1. Project description: {project_desc}
2. Milestone description: {milestone_desc}
3. Start date: {start_date}
4. End date: {end_date}

Format:

1. Milestone Essentials
    - Begin with a Markdown formatted introduction: "### **Milestone Essentials**"
    - Summarise the goal of this milestone in one short sentence. Formulate it as the milestone is already done and was implemented and fulfils the outcome successfully. Use as view words as possible.
2. Outcome
    - Use Markdown headers and bullet points: "### **Outcome = Definition of when the Milestone is Completed**"
    - Define clear, measurable outcomes or checklist items.
    - Either measurable (e.g. financial outcome, product metric) or can be ticked off (through one or more check-box items that are clearly defined)
    - Good examples: Reach 1,000 sign-ups, increase conversion rate from 20% to 28% through product initiative x, or identify 3 core value propositions that are each (i) confirmed in n user interviews and (ii) proven through outcome x in performance marketing
    - Bad examples: Launch new feature set x, or reach product-market-fit (without further specifying how it is defined)
3. Hypotheses
    - Format with Markdown: "### **Hypotheses**"
    - List hypotheses as structured statements.
    - Use following hypotheses template: Because we believe X, if we do Y, we expect Z to happen.
    - Make the outcome (Z) specific. For example (increase conversion rate from 15% to 21%)
    - Example: “Because we believe non-removal of backgrounds in specific scenes adds to ad realism, if we implement this “new style”, we expect to generate 1 paid ad for every 14 free/example Ad.”
4. Phases / Work Streams
    - Describe each phase with Markdown bullets, including description, hypothesis, definition of done, and realistic due dates.
    - Hypothesis should follow this template: Because we believe X, if we do Y, we expect Z to happen.
    - **Due date**, i.e. when the *full outcome* ********************************is reached, not when a task is done; once reached, the status can be set to **Completed** upon management approval
    - Example: 
    "- Phase 1: Development and Testing 
    - Hypothesis: Gamification will drive engagement. 
    - Definition of Done: Feature developed and tested with a focus group by May 1st."
5. Cost
    - Start with "### **Cost = One-time Invest**"
    - Think about all possible cost that may raise during this project. Be realistic. Calculate 400€ for every internal team member a day.
    - Related **invest**, including internal team, external cost to develop and deploy the milestone but excluding recurring COGS (such as server cost or tool usage per unit)
    - Use Markdown tables to outline costs for each phase.
    - The table should include headers for different phases and types of costs (e.g. Internal and External cost.).
    - The headers are "EUR (or other)", "Phase 1 [if applicable]", "Phase 2 [if applicable]", "Phase 3 [if applicable]", and "Total".
    - The rows should be divided into "Internal cost" and "External cost", each with subcategories "Team", "Other", "Freelancer(s)", and "Other [specify if relevant]".
    - Fill out every cell and think it through.

Tone: Professional, concise, and clear, ensuring each section of the template is filled out with relevant details and in a format that is easily translatable to Notion markdown.
`;
