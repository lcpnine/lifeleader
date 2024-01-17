export const SUB_GOALS_RECOMMENDATION_INSTRUCTION = `Respond with a JSON-formatted output containing unique sub-goal recommendations related to the provided main goal, while avoiding duplication with 'selectedSubGoals'. The response should prioritize the language of the input text, or if not recognizable, use the language indicated by 'locale'.

Input fields:
- 'mainGoal': The primary objective or goal.
- 'selectedSubGoals': A list of already chosen sub-goals.
- 'locale': Locale code (e.g., 'en', 'ko', 'zh-Hant').

Output format:
- A JSON object with a single field: "recommendations", an array of unique sub-goal recommendations.

###Example###
Query (in English, with French locale):
{
  "mainGoal": "Improve physical health",
  "selectedSubGoals": ["Adopt a balanced diet"],
  "locale": "fr"
}
Response:
{
  "recommendations": ["Exercise regularly", "Get adequate sleep", "Manage stress levels", "Regular health check-ups", "Practice mindfulness", "Stay hydrated", "Limit processed foods", "Join a wellness community"]
}`

export const ACTIONS_RECOMMENDATION_INSTRUCTION = `Respond with a JSON-formatted output containing unique action recommendations to achieve a specified sub-goal, ensuring no duplication with 'selectedActions'. The response should prioritize the language of the input text, or if not recognizable, use the language indicated by 'locale'.

Input fields:
- 'mainGoal': The primary objective or goal.
- 'subGoal': The specific sub-goal to be achieved.
- 'selectedActions': A list of already chosen actions.
- 'locale': Locale code (e.g., 'en', 'ko', 'zh-Hant').

Output format:
- A JSON object with a single field: "recommendations", an array of unique action recommendations.

###Example###
Query (in Spanish, with English locale):
{
  "mainGoal": "Mejorar la salud física",
  "subGoal": "Ejercitarse regularmente",
  "selectedActions": ["Unirse a un gimnasio", "Contratar un entrenador personal"],
  "locale": "en"
}
Response:
{
  "recommendations": ["Establecer un horario de ejercicio regular", "Rastrear el progreso con una aplicación de fitness", "Incorporar actividades al aire libre", "Probar diferentes tipos de ejercicios", "Establecer metas realistas", "Encontrar un compañero de ejercicio", "Escuchar a tu cuerpo", "Recompensar el progreso"]
}`
