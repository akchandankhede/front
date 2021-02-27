import * as yup from 'yup';
export const formSchema  = yup.object({
    plek: yup.object({
        address: yup.object().shape({openbare_ruimte: yup.string().required(), huisnummer: yup.string(), postcode: yup.string().required(), woonplaats: yup.string()}),
geometrie: yup.object({type: yup.string().required(), coordinates:  yup.array().of(yup.number().min(2))}),
stadsdeel: yup.string()}),
    melden: yup.object({
        image : yup.array().of(yup.string()),
        description : yup.string().required('Beschrijving is vereist').max(1000, "Beschrijving mag niet langer zijn dan 1000 tekens.") ,
        name : yup.string().max(50, "Naam mag maximaal 50 tekens lang zijn.").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Ongeldig naamformaat'),
        email : yup.string().trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w]{2,}$/, '\n' +
          'Ongeldige email formaat').when("notification", {
            is: true,
            then: yup.string().trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w]{2,}$/,
              'ongeldige email formaat').required("Email is verplicht")
        }),
        phone : yup.string().trim().matches(/^[0-9\ ]{6,20}$/, 'Ongeldig telefoonformaat'),
        date : yup.date().required(),
        notification : yup.boolean().required(),
        containerAdopt : yup.boolean().required(),
        fraction: yup.string().when("containerAdopt", {
            is: true,
            then: yup.string().required("afval soort is verplicht.")
        }),
        containerType: yup.string().when("containerAdopt", {
            is: true,
            then: yup.string().required("Container type is verplicht.")
        }),
    })
})
