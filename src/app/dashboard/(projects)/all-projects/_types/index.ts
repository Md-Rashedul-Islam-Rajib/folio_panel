export type TProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  frontendGithubRepoLink: string;
  backendGithubRepoLink: string;
  imageUrl?: string[];
  createdAt?: string;
};
