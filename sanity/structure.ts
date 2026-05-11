import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('homeGroup')
        .title('Home')
        .child(
          S.list()
            .title('Home')
            .items([
              S.documentTypeListItem('chapter').title('Chapters'),
              S.documentTypeListItem('quote').title('Quotes'),
            ])
        ),
      S.divider(),
      S.listItem()
        .id('musicGroup')
        .title('Music')
        .child(
          S.list()
            .title('Music')
            .items([
              S.documentTypeListItem('song').title('Songs'),
              S.documentTypeListItem('concertPhoto').title('Concert Photos'),
              S.documentTypeListItem('behindTheScenes').title('Behind the Scenes'),
              S.documentTypeListItem('thought').title('Thoughts'),
            ])
        ),
      S.divider(),
      S.listItem()
        .id('researchGroup')
        .title('Research')
        .child(
          S.list()
            .title('Research')
            .items([
              S.documentTypeListItem('researchPaper').title('Papers'),
              S.documentTypeListItem('interactiveInstallation').title('Interactive Installations'),
            ])
        ),
      S.divider(),
      S.listItem()
        .id('lifeGroup')
        .title('Life')
        .child(
          S.list()
            .title('Life')
            .items([
              S.documentTypeListItem('photo').title('Photos'),
              S.documentTypeListItem('pet').title('Pets'),
              S.documentTypeListItem('concertMemory').title('Concert Memories'),
            ])
        ),
    ])