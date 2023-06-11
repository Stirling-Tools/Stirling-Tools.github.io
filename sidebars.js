/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'Overview/What is Stirling-PDF'
    },
    {
      type: 'doc',
      id: 'Overview/The Technologies'
    },
    {
      type: 'category',
      label: 'Functionality',
      items: [
        {
          type: 'doc',
          id: 'Functionality/Security/Overview'
        },
        {
          type: 'doc',
          id: 'Functionality/Page operations/Overview'
        },
        {
          type: 'doc',
          id: 'Functionality/Other/Overview'
        },
        {
          type: 'doc',
          id: 'Functionality/Conversions/Overview'
        },
      ]
    },
    {
      type: 'category',
      label: 'Getting started',
      items: [
        {
          type: 'category',
          label: 'Docker',
          items: [
		  {
              type: 'doc',
              id: 'Getting started/Installation/Docker/Docker Versions'
            },
            {
              type: 'doc',
              id: 'Getting started/Installation/Docker/Docker Install'
            },
            
          ]
        },
		{
          type: 'category',
          label: 'Local',
          items: [
		  {
              type: 'doc',
              id: 'Getting started/Installation/Local/Unix Installation'
            },
             {
              type: 'doc',
              id: 'Getting started/Installation/Local/Windows Installation'
            },
			
			
			
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Advanced Configuration',
      items: [
        {
          type: 'doc',
          id: 'Advanced Configuration/UI Customisation'
        },
        {
          type: 'doc',
          id: 'Advanced Configuration/Endpoint or Feature Customisation'
        },
        {
          type: 'doc',
          id: 'Advanced Configuration/Other Customisations'
        },
      ]
    },
    {
      type: 'doc',
      id: 'API'
    },
    {
      type: 'doc',
      id: 'FAQ'
    }
  ]
};

module.exports = sidebars;
