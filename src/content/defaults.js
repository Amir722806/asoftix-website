// The content bundled with the site. The admin panel saves edits on top of these.
import { site, techStack, whyUs, process, faqs, theme } from '../data/site';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { team } from '../data/team';

export const defaults = { site, services, projects, team, whyUs, process, faqs, techStack, theme };
export const CONTENT_KEYS = Object.keys(defaults);
