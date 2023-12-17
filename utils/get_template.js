export const templates = {
  "Milestone": "milestone_template.js",
  "User personas": "personas_template.js",
  "Ticket": "ticket_template.js"
};

export async function getTemplate(input) {

  const template_path = templates[input];

  let template_module;
  try {
    template_module = await import(`./${template_path}`);
  } catch (error) {
    throw new Error("Can't find template: " + template_path);
  }
  return template_module.template;
}
