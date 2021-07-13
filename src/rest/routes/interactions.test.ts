import { http as app } from "../../../example/full-server"

/**
 * Setting a mock UUID for all tests
 */
jest.mock('crypto', () => ({
  randomUUID: () => "6d054fdb-1475-47f3-90de-1d839d599504"
}));

test("create and read operations work", async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/Patient',
    payload: {
      "resourceType": "Patient",
      "meta": {
        "profile": [ "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient" ]
      },
      "text": {
        "status": "generated",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Generated by <a href=\"https://github.com/synthetichealth/synthea\">Synthea</a>.Version identifier: 0133f46\n .   Person seed: -5519748007577084054  Population seed: 1626060157145</div>"
      },
      "extension": [ {
        "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
        "extension": [ {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2106-3",
            "display": "White"
          }
        }, {
          "url": "text",
          "valueString": "White"
        } ]
      }, {
        "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
        "extension": [ {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2186-5",
            "display": "Not Hispanic or Latino"
          }
        }, {
          "url": "text",
          "valueString": "Not Hispanic or Latino"
        } ]
      }, {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName",
        "valueString": "Laurene370 Murazik203"
      }, {
        "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
        "valueCode": "F"
      }, {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-birthPlace",
        "valueAddress": {
          "city": "Wrentham",
          "state": "Massachusetts",
          "country": "US"
        }
      }, {
        "url": "http://synthetichealth.github.io/synthea/disability-adjusted-life-years",
        "valueDecimal": 6.843692370260894
      }, {
        "url": "http://synthetichealth.github.io/synthea/quality-adjusted-life-years",
        "valueDecimal": 68.1563076297391
      } ],
      "identifier": [ {
        "system": "https://github.com/synthetichealth/synthea",
        "value": "7489fbf2-cc8d-27d5-3f16-1f186ad4ac96"
      }, {
        "type": {
          "coding": [ {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MR",
            "display": "Medical Record Number"
          } ],
          "text": "Medical Record Number"
        },
        "system": "http://hospital.smarthealthit.org",
        "value": "7489fbf2-cc8d-27d5-3f16-1f186ad4ac96"
      }, {
        "type": {
          "coding": [ {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "SS",
            "display": "Social Security Number"
          } ],
          "text": "Social Security Number"
        },
        "system": "http://hl7.org/fhir/sid/us-ssn",
        "value": "999-34-9501"
      }, {
        "type": {
          "coding": [ {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "DL",
            "display": "Driver's License"
          } ],
          "text": "Driver's License"
        },
        "system": "urn:oid:2.16.840.1.113883.4.3.25",
        "value": "S99997358"
      }, {
        "type": {
          "coding": [ {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "PPN",
            "display": "Passport Number"
          } ],
          "text": "Passport Number"
        },
        "system": "http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber",
        "value": "X45299535X"
      } ],
      "name": [ {
        "use": "official",
        "family": "Fisher429",
        "given": [ "Ela754" ],
        "prefix": [ "Mrs." ]
      }, {
        "use": "maiden",
        "family": "Thiel172",
        "given": [ "Ela754" ],
        "prefix": [ "Mrs." ]
      } ],
      "telecom": [ {
        "system": "phone",
        "value": "555-285-2097",
        "use": "home"
      } ],
      "gender": "female",
      "birthDate": "1945-08-16",
      "address": [ {
        "extension": [ {
          "url": "http://hl7.org/fhir/StructureDefinition/geolocation",
          "extension": [ {
            "url": "latitude",
            "valueDecimal": 41.69091711137212
          }, {
            "url": "longitude",
            "valueDecimal": -70.17341499507617
          } ]
        } ],
        "line": [ "1014 Erdman Park Apt 60" ],
        "city": "Dennis",
        "state": "MA",
        "country": "US"
      } ],
      "maritalStatus": {
        "coding": [ {
          "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
          "code": "M",
          "display": "M"
        } ],
        "text": "M"
      },
      "multipleBirthBoolean": false,
      "communication": [ {
        "language": {
          "coding": [ {
            "system": "urn:ietf:bcp:47",
            "code": "en-US",
            "display": "English"
          } ],
          "text": "English"
        }
      } ]
    }
  });

  expect(response.statusCode).toEqual(201)
  expect(response.headers["location"]).toEqual("/Patient/6d054fdb-1475-47f3-90de-1d839d599504")

  const patientQuery = await app.inject({
    method: 'GET',
    url: `/Patient/6d054fdb-1475-47f3-90de-1d839d599504`
  })

  const patientBody = JSON.parse(patientQuery.body);

  expect(patientQuery.statusCode).toEqual(200)
  expect(patientBody.name).toEqual([{"family": "Fisher429", "given": ["Ela754"], "prefix": ["Mrs."], "use": "official"}, {"family": "Thiel172", "given": ["Ela754"], "prefix": ["Mrs."], "use": "maiden"}])

});
