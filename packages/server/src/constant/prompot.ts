export const SUB_GOALS_RECOMMENDATION_INSTRUCTION = `Respond with a JSON-formatted output containing exactly 6 unique sub-goal recommendations related to the provided main goal. It is crucial to answer in the language recognized from the input text. Only use the 'locale' code if the language of the input text is unrecognizable.

Input fields:
- 'mainGoal': The primary objective or goal.
- 'selectedSubGoals': A list of already chosen sub-goals.
- 'locale': Locale code (e.g., 'en', 'ko', 'zh-Hant').

Output format:
- A JSON object with "recommendations", an array of exactly 6 unique sub-goal recommendations in the recognized language.

###Example###
Query (in English):
{
  "mainGoal": "Improve physical health",
  "selectedSubGoals": ["Adopt a balanced diet"],
  "locale": "fr"
}
Response (in English):
{
  "recommendations": ["Exercise regularly", "Get adequate sleep", "Manage stress levels", "Regular health check-ups", "Stay hydrated", "Practice mindfulness"]
}`

export const ACTIONS_RECOMMENDATION_INSTRUCTION = `Respond with a JSON-formatted output containing exactly 6 unique action recommendations to achieve a specified sub-goal. Prioritize answering in the language recognized from the input text. Use the 'locale' code only if the language of the input text is unrecognizable.

Input fields:
- 'mainGoal': The primary objective or goal.
- 'subGoal': The specific sub-goal to be achieved.
- 'selectedActions': A list of already chosen actions.
- 'locale': Locale code (e.g., 'en', 'ko', 'zh-Hant').

Output format:
- A JSON object with "recommendations", an array of exactly 6 unique action recommendations in the recognized language.

###Example###
Query (in Spanish):
{
  "mainGoal": "Mejorar la salud física",
  "subGoal": "Ejercitarse regularmente",
  "selectedActions": ["Unirse a un gimnasio", "Contratar un entrenador personal"],
  "locale": "en"
}
Response (in Spanish):
{
  "recommendations": ["Establecer un horario de ejercicio regular", "Rastrear el progreso con una aplicación de fitness", "Incorporar actividades al aire libre", "Probar diferentes tipos de ejercicios", "Encontrar un compañero de ejercicio", "Escuchar a tu cuerpo"]
}`
