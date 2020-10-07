module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // Inserir Dados na tabela de Proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    //Inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `) 

    const class_id = insertedClass.lastID

    // Inserir dados na tabela vlass_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((class_scheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${class_scheduleValue.weekday}",
                "${class_scheduleValue.time_from}",
                "${class_scheduleValue.time_to}"
            );
        `)
    })

    //Vou executar todos os db.runs() das class_schedule
    await Promise.all(insertedAllClassScheduleValues)
}