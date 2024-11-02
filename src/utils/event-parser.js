const eventParser = (activity) => {
    const { type, actor, repo, created_at } = activity;

    let message = '';

    switch(type) {
        case 'PushEvent':
            if ( activity.payload.size === 0 ) {
                break;
            }
            message = `Pushed ${activity.payload.size} ${activity.payload.size > 1 ? 'commits' : 'commit'} to ${activity.payload.ref.replace('refs/heads/', '')} at https://github.com/${repo.name}`;
            break;
        case 'CreateEvent':
            message = `Created a new ${activity.payload.ref_type} ${activity.payload.ref} at ${repo.name}`;
            break;
        case 'DeleteEvent':
            message = `Deleted ${activity.payload.ref_type} ${activity.payload.ref} at ${repo.name}`;
            break;
        case 'WatchEvent':
            message = `Starred ${repo.name}`;
            break;
        case 'IssuesEvent':
            message = `${activity.payload.action} issue #${activity.payload.issue.number} at ${repo.name}. More at ${activity.payload.issue.html_url}`;
            break;
        case 'IssueCommentEvent':
            message = `Commented on issue #${activity.payload.issue.number} at ${repo.name}. More at ${activity.payload.comment.html_url}`;
            break;
        case 'ForkEvent':
            message = `Forked ${repo.name}`;
            break;
        case 'PullRequestEvent':
            message = `${activity.payload.action} pull request #${activity.payload.number} at ${repo.name}. More at ${activity.payload.pull_request.html_url}`;
            break;
        case 'PullRequestReviewCommentEvent':
            message = `Commented on pull request #${activity.payload.pull_request.number} at ${repo.name}. More at ${activity.payload.comment.html_url}`;
            break;
        case 'ReleaseEvent':
            message = `Released ${activity.payload.release.tag_name} at ${repo.name}`;
            break;
        case 'PublicEvent':
            message = `Open sourced ${repo.name}`;
            break;
        case 'MemberEvent':
            message = `Added ${activity.payload.member.login} as a collaborator to ${repo.name}`;
            break;
        case 'GollumEvent':
            message = `Created or updated a wiki page in ${repo.name}`;
            break;
        case 'CommitCommentEvent':
            message = `Commented on a commit at ${repo.name}`;
            break;
        case 'PullRequestReviewEvent':
            message = `${activity.payload.action} a review on pull request #${activity.payload.pull_request.number} at ${repo.name}. More at ${activity.payload.review.html_url}`;
            break;
        case 'ProjectCardEvent':
            message = `${activity.payload.action} a project card at ${repo.name}`;
            break;
        case 'ProjectColumnEvent':
            message = `${activity.payload.action} a project column at ${repo.name}`;
            break;
        case 'ProjectEvent':
            message = `${activity.payload.action} a project at ${repo.name}`;
            break;
        case 'SecurityAdvisoryEvent':
            message = `${activity.payload.action} a security advisory at ${repo.name}`;
            break;
        case 'DeploymentEvent':
            message = `${activity.payload.action} a deployment at ${repo.name}`;
            break;
        case 'DeploymentStatusEvent':
            message = `${activity.payload.action} a deployment status at ${repo.name}`;
            break;
        case 'OrganizationEvent':
            message = `${activity.payload.action} an organization`;
            break;
        case 'MarketplacePurchaseEvent':
            message = `${activity.payload.action} a marketplace purchase`;
            break;
        case 'LabelEvent':
            message = `${activity.payload.action} a label at ${repo.name}`;
            break;
        case 'ContentReferenceEvent':
            message = `${activity.payload.action} a content reference at ${repo.name}`;
            break;
        case 'CheckRunEvent':
            message = `${activity.payload.action} a check run at ${repo.name}`;
            break;
        case 'CheckSuiteEvent':
            message = `${activity.payload.action} a check suite at ${repo.name}`;
            break;
        case 'StatusEvent':
            message = `${activity.payload.state} the commit status at ${repo.name}`;
            break;
        default:
            message = `Performed a ${type} event at ${repo.name}`;
            break;
    }
    
    return {
        type,
        actor: actor.display_login,
        repo: repo.name,
        created_at,
        message
    };

}

export default eventParser;