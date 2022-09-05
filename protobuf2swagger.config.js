module.exports = {
    // ERQU
    files: [
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/phenopackets.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/base.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/biosample.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/disease.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/genome.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/individual.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/interpretation.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/measurement.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/medical_action.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/meta_data.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/pedigree.proto',
      'phenopacket-schema/src/main/proto/phenopackets/schema/v2/core/phenotypic_feature.proto',
    ],
    // Optional
    dist: 'apischema.json',
    // Optional
    formatServicePath: (path) => path.replace(/\./g, '/'),
    // Optional, will convert long to string by default
    long: 'number',
    // Optional
    // This will merge and overwrite the result parsed from protobuffer file.
    // `paths` will merge by path
    // `components` will merge by component except shcemas
    customSchema: {
      swagger: '2.0',
      paths: {
        '/api/v1/phenopacket': {
          get: {
            responses: {
              200: {
                schema: {
                  "$ref": "#/definitions/org.phenopackets.schema.v2.Phenopacket"
                },
              },
            },
            parameters: [
              {
                "name": "hash",
                "in": "query",
                "description": "ID of phenopacket to return",
                "required": true,
                "schema": {
                  "type": "string",
                }
              }
            ],
          },
          post: {
            requestBody: {
              description: "Phenopacket", 
              schema: {
                "$ref": "#/definitions/org.phenopackets.schema.v2.Phenopacket"
              }
            },
            parameters: [
              {
                in: "body",
                name: "body",
                description: "phenopacket",
                schema: {
                  "$ref": "#/definitions/org.phenopackets.schema.v2.Phenopacket"
                }
              }
            ],
            responses: {
              201: {
                schema: {
                  "$ref": "#/definitions/org.phenopackets.schema.v2.Phenopacket"
                },
              },
            },
          },
        },
        '/api/v1/phenopacket/{id}': {
          get: {
            responses: {
              200: {
                schema: {
                  "$ref": "#/definitions/org.phenopackets.schema.v2.Phenopacket"
                },
              },
            },
            parameters: [
              {
                "name": "id",
                "in": "path",
                "description": "ID of phenopacket to return",
                "required": true,
                "schema": {
                  "type": "string",
                }
              }
            ],
          },
        },
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'token',
          },
        },
      },
      security: [
        {
          cookieAuth: [],
        },
      ],
    }

  };