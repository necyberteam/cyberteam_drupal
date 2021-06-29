<?php
$getProjects = $conn->prepare("SELECT DISTINCT sid FROM webform_submission_data WHERE webform_id='project'");
$getProjects->execute();
$getProjectsResults = $getProjects->get_results();
if ($getProjectsResults->num_rows > 0) {
  while($project = $getProjects->fetch_assoc()) {
    $projectArr[] =
  }
}


//select milestone_title = (select value from webform_submission_data where property='milestone_title' and sid=125 and delta=0), milestone_description = (select value from webform_submission_data where property='milestone_description' and sid=125 and delta=0) from webform_submission_data;

select milestone.delta, milestone.sid, t.milestone_title, d.milestone_description, g.milestone_goal_date, a.milestone_actual_date from webform_submission_data milestone JOIN (SELECT sid, value AS milestone_title, delta from webform_submission_data where property='milestone_title') as t on milestone.sid=t.sid and milestone.delta = t.delta JOIN (SELECT sid, value AS milestone_description, delta from webform_submission_data where property='milestone_description') as d on milestone.sid=d.sid and milestone.delta = d.delta JOIN (SELECT sid, value AS milestone_goal_date, delta from webform_submission_data where property='milestone_goal_date') as g on milestone.sid=g.sid and milestone.delta = g.delta JOIN (SELECT sid, value AS milestone_actual_date, delta from webform_submission_data where property='milestone_actual_date') as a on milestone.sid=a.sid and milestone.delta = a.delta WHERE name='project_milestones' GROUP BY milestone.sid, t.milestone_title, d.milestone_description, g.milestone_goal_date, a.milestone_actual_date, milestone.delta;
