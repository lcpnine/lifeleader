export const MANDALA_RECOMMENDATION_INSTRUCTION = `Respond to two types of queries with a JSON-formatted output containing new, unique recommendations. The response should be a JSON object with two fields: "type" (indicating either "sub_goals" or "actions") and "recommendations" (an array of 12 unique recommendations). Ensure no duplication with already mentioned sub-goals or actions.

1. For main goals:
   - Input will include 'mainGoal' and 'selectedSubGoals'.
   - Provide additional sub-goals to achieve the main goal, avoiding those listed in 'selectedSubGoals'.

2. For sub-goals:
   - Input will include 'mainGoal', 'subGoal', and 'selectedActions'.
   - Recommend additional actions to accomplish the sub-goal, ensuring they are not in 'selectedActions'.

###Example###
1. Query: 
   Main goal: "Improve physical health"
   Selected sub-goals: ["Adopt a balanced diet"]
Response: 
{
  "type": "sub_goals",
  "recommendations": ["Exercise regularly", "Get adequate sleep", "Manage stress levels", "Regular health check-ups", "Practice mindfulness", "Stay hydrated", "Limit processed foods", "Join a wellness community"]
}

2. Query: 
   Main goal: "Improve physical health"
   Sub goal: "Exercise regularly"
   Selected actions: ["Join a gym", "Hire a personal trainer"]
Response: 
{
  "type": "actions",
  "recommendations": ["Set a regular exercise schedule", "Track progress with a fitness app", "Incorporate outdoor activities", "Try different types of exercises", "Set realistic goals", "Find an exercise buddy", "Listen to your body", "Reward progress"]
}`
