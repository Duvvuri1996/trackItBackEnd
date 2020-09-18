define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/issue/comments/:issueId",
    "title": "get all comments",
    "version": "1.0.0",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId  passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All comments found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tcommentId: \"string\",\n                        comment: \"string\",\n\t\t\t\t\t\treporterId: \"string\",\n\t\t\t\t\t\treporterName : \"string\",\n\t\t\t\t\t\tcreatorId : \"string\",\n\t\t\t\t\t\tissueId : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To find comments\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "Comment",
    "name": "GetApiV1IssueCommentsIssueid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/createcomment",
    "title": "Create comment",
    "version": "1.0.0",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>comment  passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reporterId",
            "description": "<p>userId of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "reporterName",
            "description": "<p>userName of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Comment created successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tcommentId: \"string\",\n                        comment: \"string\",\n\t\t\t\t\t\treporterId: \"string\",\n\t\t\t\t\t\treporterName : \"string\",\n\t\t\t\t\t\tcreatorId : \"string\",\n\t\t\t\t\t\tissueId : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To post comment\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "Comment",
    "name": "PostApiV1IssueCreatecomment"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/deletecomment/:commentId",
    "title": "Delete comment",
    "version": "1.0.0",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>commentId  passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Comment deleted successfully\",\n\t    \"status\": 200,\n\t    \"data\": \"null\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To delete comment\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "Comment",
    "name": "PostApiV1IssueDeletecommentCommentid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/create",
    "title": "Create an issue",
    "version": "1.0.0",
    "group": "issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issuetTitle",
            "description": "<p>issuetTitle of the issue passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the reporter passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "issueDescription",
            "description": "<p>issueDescription of the issue passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the issue passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userEmail",
            "description": "<p>userEmail of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assigneeId",
            "description": "<p>assigneeId of the user as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assigneeName",
            "description": "<p>assigneeName of the user passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "images",
            "description": "<p>images of the issue passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue created successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n                        issueTitle: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName : \"string\",\n\t\t\t\t\t\tassigneeeId : \"string\",\n\t\t\t\t\t\tassigneeName : \"string\",\n                        images : [],\n                        endDate: : \"Date\",\n                        createdOn:  : \"Date\",\n\t\t\t\t\t\tmodifiedOn : \"Date\",\n\t\t\t\t\t\tissueDescription : \"string\",\n\t\t\t\t\t\tstatus : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To create issue\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/delete/:issueId",
    "title": "Delete issue",
    "version": "1.0.0",
    "group": "issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>The issueId passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Deleted successfully.\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured while deleting issue.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueDeleteIssueid"
  },
  {
    "type": "put",
    "url": "/api/v1/issue/edit/:issueId",
    "title": "Edit an issue",
    "version": "1.0.0",
    "group": "issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue edited successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n                        issueTitle: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName : \"string\",\n\t\t\t\t\t\tassigneeeId : \"string\",\n\t\t\t\t\t\tassigneeName : \"string\",\n                        images : [],\n                        endDate: : \"Date\",\n                        createdOn:  : \"Date\",\n\t\t\t\t\t\tmodifiedOn : \"Date\",\n\t\t\t\t\t\tissueDescription : \"string\",\n\t\t\t\t\t\tstatus : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to edit issue\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueEditIssueid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/allIssues",
    "title": "Get all issues",
    "version": "1.0.0",
    "group": "issues",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All Issues Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n                        issueTitle: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName : \"string\",\n\t\t\t\t\t\tassigneeeId : \"string\",\n\t\t\t\t\t\tassigneeName : \"string\",\n                        images : [],\n                        endDate: : \"Date\",\n                        createdOn:  : \"Date\",\n\t\t\t\t\t\tmodifiedOn : \"Date\",\n\t\t\t\t\t\tissueDescription : \"string\",\n\t\t\t\t\t\tstatus : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find Issue Details\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "issues",
    "name": "GetApiV1IssueAllissues"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/singleissue/:issueId",
    "title": "Get all issues of a single user",
    "version": "1.0.0",
    "group": "issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of user as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue Details\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n                        issueTitle: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName : \"string\",\n\t\t\t\t\t\tassigneeeId : \"string\",\n\t\t\t\t\t\tassigneeName : \"string\",\n                        images : [],\n                        endDate: : \"Date\",\n                        createdOn:  : \"Date\",\n\t\t\t\t\t\tmodifiedOn : \"Date\",\n\t\t\t\t\t\tissueDescription : \"string\",\n\t\t\t\t\t\tstatus : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find Issue Details\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "issues",
    "name": "GetApiV1IssueSingleissueIssueid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/notification/:userId",
    "title": "Get all notifications",
    "version": "1.0.0",
    "group": "notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All notification details found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tuserId: \"string\",\n                        notificationCount: \"string\",\n\t\t\t\t\t\tnotificationDescription: \"string\",\n\t\t\t\t\t\tissueId : \"string\",\n\t\t\t\t\t\tcreatorId : \"string\",\n                        createdOn:  : \"Date\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"No notification details found\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "notifications",
    "name": "GetApiV1IssueNotificationUserid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/deleteWatch",
    "title": "delete watcher",
    "version": "1.0.0",
    "group": "notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>issueId of the user passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Removed successfully from watch\",\n\t    \"status\": 200,\n\t    \"data\": \"null\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to remove from watch list\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "notifications",
    "name": "PostApiV1IssueDeletewatch"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/notifycount",
    "title": "Get count of notifications",
    "version": "1.0.0",
    "group": "notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All notification details found\",\n\t    \"status\": 200,\n\t    \"data\": \"count\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To get count of notification details\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "notifications",
    "name": "PostApiV1IssueNotifycount"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/removeWatchersOnIssue/:issueId",
    "title": "delete watcherlist of an issue",
    "version": "1.0.0",
    "group": "notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Removed successfully\",\n\t    \"status\": 200,\n\t    \"data\": \"null\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to remove watcher\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "notifications",
    "name": "PostApiV1IssueRemovewatchersonissueIssueid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/search",
    "title": "Search Issue",
    "version": "1.0.0",
    "group": "searchIssue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>search  passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Docs Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n                        issueTitle: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName : \"string\",\n\t\t\t\t\t\tassigneeeId : \"string\",\n\t\t\t\t\t\tassigneeName : \"string\",\n                        images : [],\n                        endDate: : \"Date\",\n                        createdOn:  : \"Date\",\n\t\t\t\t\t\tmodifiedOn : \"Date\",\n\t\t\t\t\t\tissueDescription : \"string\",\n\t\t\t\t\t\tstatus : \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to find docs\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "searchIssue",
    "name": "PostApiV1IssueSearch"
  },
  {
    "type": "get",
    "url": "/api/logout",
    "title": "Logout social login user",
    "version": "1.0.0",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Logout successfull.\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiLogout"
  },
  {
    "type": "get",
    "url": "/api/v1/user/allSocialUsers",
    "title": "Get all social users",
    "version": "1.0.0",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"error\": false,\n\t    \"message\": \"All User Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tuserId: \"string\",\n                        firstName: \"string\",\n                        lastName: \"string\",\n                        email: \"string\",\n                        createdOn: \"date\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find User Details\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UserAllsocialusers"
  },
  {
    "type": "get",
    "url": "/api/v1/user/allusers",
    "title": "Get all users",
    "version": "1.0.0",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"error\": false,\n\t    \"message\": \"All User Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tuserId: \"string\",\n                        firstName: \"string\",\n                        lastName: \"string\",\n                        fullName : \"string\",\n                        mobileNumber: \"string\",\n                        email: \"string\",\n                        createdOn: \"date\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find User Details\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UserAllusers"
  },
  {
    "type": "get",
    "url": "/api/v1/user/alluserscount",
    "title": "Get count of all Normal users users",
    "version": "1.0.0",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All  Users count Found\",\n\t    \"status\": 200,\n\t    \"data\": \"number\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To get count of all Users\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UserAlluserscount"
  },
  {
    "type": "post",
    "url": "/api/v1/user/logout",
    "title": "Logout normal user",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication for normal login users.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Logout successfull.\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UserLogout"
  },
  {
    "type": "post",
    "url": "/api/v1/user/recoverymail",
    "title": "Recoverymail to reset password",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userEmail",
            "description": "<p>userEmail of the user passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Email sent successfully.\",\n\t    \"status\": 200,\n\t    \"data\": \"Please check your email\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UserRecoverymail"
  },
  {
    "type": "post",
    "url": "/api/v1/user/resetpassword",
    "title": "Reset password",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recoveryToken",
            "description": "<p>as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>userPassword of the user passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Password set successfully\",\n\t    \"status\": 200,\n\t    \"data\": \"Password set successfully\"\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UserResetpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/user/signin",
    "title": "Signin user",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userEmail",
            "description": "<p>email of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>password of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Login successfull.\",\n\t    \"status\": 200,\n\t    \"data\": {\n                    authToken: \"string\",\n                    userId: \"string\",\n                    firstName: \"string\",\n                    lastName: \"string\",\n                    fullName : \"string\",\n                    mobileNumber: \"string\",\n                    userEmail: \"string\",\n                    createdOn: \"date\"\n\t\t\t\t}\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UserSignin"
  },
  {
    "type": "post",
    "url": "/api/v1/user/signup",
    "title": "Signup user",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userEmail",
            "description": "<p>email of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>password of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Signup successfull.\",\n\t    \"status\": 200,\n\t    \"data\": {\n                    authToken : \"string\"\n                    userId: \"string\", \n                    firstName: \"string\",\n                    lastName: \"string\",\n                    fullName : \"string\",\n                    mobileNumber: \"string\",\n                    userEmail: \"string\",\n                    createdOn: \"date\"\n\t\t\t\t}\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UserSignup"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/watchcount/:issueId",
    "title": "Count watch details",
    "version": "1.0.0",
    "group": "watch",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Watch details retrieved successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t\"count\": \"Number\"\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to count watch details of user\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "watch",
    "name": "GetApiV1IssueWatchcountIssueid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/watchofuser/:userId",
    "title": "Watch list of user",
    "version": "1.0.0",
    "group": "watch",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "watchId",
            "description": "<p>userId of the user passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Watch details retrieved successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\tissueId: \"string\",\n\t\t\t\t\twatchId: \"string\"\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed to finde watch details of user\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "watch",
    "name": "GetApiV1IssueWatchofuserUserid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/watch",
    "title": "Post a watch",
    "version": "1.0.0",
    "group": "watch",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issues as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "watchId",
            "description": "<p>userId passed as watchId as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Watch created successfully\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tissueId: \"string\",\n\t\t\t\t\t\twatchId: \"string\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To post watch\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/sowmya/trackIt/trackItBackEnd/app/routes/issueRoutes.js",
    "groupTitle": "watch",
    "name": "PostApiV1IssueWatch"
  }
] });
