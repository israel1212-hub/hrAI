-- Interview System Tables

-- Interview sessions table
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  candidate_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  total_score INTEGER DEFAULT 0,
  max_possible_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Questions table
CREATE TABLE IF NOT EXISTS public.interview_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  max_points INTEGER NOT NULL DEFAULT 10,
  min_words INTEGER NOT NULL DEFAULT 20,
  keywords JSONB DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Answers table
CREATE TABLE IF NOT EXISTS public.interview_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.interview_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 10,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed some default questions for demo purposes
INSERT INTO public.interview_questions (user_id, question_text, category, max_points, min_words, keywords, sort_order)
SELECT 
  NULL,
  'Tell me about a challenging problem you faced at work and how you solved it.',
  'Problem Solving',
  10,
  20,
  '["challenge", "solution", "analyze", "approach", "resolved", "outcome", "strategy", "team", "result", "impact"]'::jsonb,
  0
WHERE NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE question_text LIKE 'Tell me about a challenging problem%');

INSERT INTO public.interview_questions (user_id, question_text, category, max_points, min_words, keywords, sort_order)
SELECT 
  NULL,
  'Describe a situation where you had to communicate complex information to a non-technical audience.',
  'Communication',
  10,
  20,
  '["explain", "simplify", "audience", "clear", "understand", "communicate", "feedback", "effective", "adapt", "present"]'::jsonb,
  1
WHERE NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE question_text LIKE 'Describe a situation where you had to communicate%');

INSERT INTO public.interview_questions (user_id, question_text, category, max_points, min_words, keywords, sort_order)
SELECT 
  NULL,
  'How do you prioritize tasks when you have multiple deadlines competing for your attention?',
  'Time Management',
  10,
  20,
  '["prioritize", "organize", "deadline", "urgent", "important", "schedule", "manage", "focus", "efficient", "plan"]'::jsonb,
  2
WHERE NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE question_text LIKE 'How do you prioritize tasks%');

INSERT INTO public.interview_questions (user_id, question_text, category, max_points, min_words, keywords, sort_order)
SELECT 
  NULL,
  'Tell me about a time you demonstrated leadership, even if you were not in a formal leadership role.',
  'Leadership',
  10,
  20,
  '["lead", "initiative", "team", "motivate", "guide", "influence", "responsibility", "decision", "mentor", "inspire"]'::jsonb,
  3
WHERE NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE question_text LIKE 'Tell me about a time you demonstrated leadership%');

INSERT INTO public.interview_questions (user_id, question_text, category, max_points, min_words, keywords, sort_order)
SELECT 
  NULL,
  'Describe your approach to learning new skills or technologies quickly in a fast-paced environment.',
  'Adaptability',
  10,
  20,
  '["learn", "adapt", "quick", "research", "practice", "experiment", "curious", "growth", "improve", "resourceful"]'::jsonb,
  4
WHERE NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE question_text LIKE 'Describe your approach to learning%');
