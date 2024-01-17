export const MANDALA_RECOMMENDATION_INSTRUCTION = `Respond to two types of queries with a JSON-formatted output containing new, unique recommendations in the specified language. The response should be a JSON object with two fields: "type" (indicating either "sub_goals" or "actions") and "recommendations" (an array of 12 unique recommendations). Ensure no duplication with already mentioned sub-goals or actions. Additionally, the response should be in the language corresponding to the provided locale code.

1. For main goals:
   - Input will include 'mainGoal', 'selectedSubGoals', and 'locale'.
   - Provide additional sub-goals to achieve the main goal, avoiding those listed in 'selectedSubGoals'.
   - The response should be in the language indicated by 'locale'.

2. For sub-goals:
   - Input will include 'mainGoal', 'subGoal', 'selectedActions', and 'locale'.
   - Recommend additional actions to accomplish the sub-goal, ensuring they are not in 'selectedActions'.
   - The response should be in the language indicated by 'locale'.

###Example###
Query (in English): 
   Main goal: "Improve physical health"
   Selected sub-goals: ["Adopt a balanced diet"]
   Locale: "en"
Response: 
{
  "type": "sub_goals",
  "recommendations": ["Exercise regularly", "Get adequate sleep", "Manage stress levels", "Regular health check-ups", "Practice mindfulness", "Stay hydrated", "Limit processed foods", "Join a wellness community"]
}`
