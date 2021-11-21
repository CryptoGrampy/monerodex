import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

enum ProjectCategory {
  Software = "SOFTWARE",
  Research = "RESEARCH",
  Art = "ART",
  Legal = "LEGAL",
  Abandonware = "ABANDONWARE"
}

export interface MonerodexProjectV1 {
  name: string
  description: string
  repositoryUrl?: string
  skills: string[]
  contact: string
  category: ProjectCategory
  websiteUrl?: string
  tags: string[]
  guideUrl?: string
  contributorGuideUrl?: string
  helpWanted: boolean
}

export interface MonerodexProjectDataV1 {
  projects: MonerodexProjectV1[]
  meta: {
    modifiedDate: Date
  }
}

// TODO: Fix filepathing
const directoryPath = path.join(__dirname, '../projects');
const projectData: MonerodexProjectDataV1 = {
  projects: [],
  meta: {
    modifiedDate: new Date()
  }
}

// Parse all Yaml in projects folder

fs.readdir(directoryPath, (err, files) => {
  if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const yamlFiles = fs.readFileSync(`./projects/${file}`, 'utf8')

        const project: MonerodexProjectV1 = YAML.parse(yamlFiles)
        projectData.projects.push(project)
    });


  // Generate JSON output

  fs.writeFileSync('./out/monerodex-project.json', JSON.stringify(projectData), 'utf8')
});
