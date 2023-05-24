const votedMembers = new Set()

module.exports = {
    async execute(interaction){
        if(!interaction.isButton()) return

        const splittedArray = interaction.customId.split('-')
        if(splittedArray[0] !== 'Poll') return

        if(votedMembers.has(`${interaction.user.id}-${interaction.message.id}`)){
            return interaction.reply({content: "Você já votou", ephemeral: true})
        }
        votedMembers.add(`${interaction.user.id}-${interaction.message.id}`)

        const pollEmbed = interaction.message.embeds[0]
        if(!pollEmbed) return interaction.reply({content: "Erro, não foi possivel achar a votação", ephemeral: true})

        const yesField = pollEmbed.fields[1]
        const noField = pollEmbed.fields[2]

        switch(splittedArray[1]){
            case "Yes" : {
                const newYesCount = parseInt(yesField.value) + 1
                yesField.value = newYesCount
                interaction.message.edit({embeds: [pollEmbed]})
                interaction.reply({content:"Obrigado pelo voto!", ephemeral: true})
            }
            break
            case "No": {
                const newNoCount = parseInt(noField.value) + 1
                noField.value = newNoCount
                interaction.message.edit({embeds: [pollEmbed]})
                interaction.reply({content:"Obrigado pelo voto!", ephemeral: true})
            }
            break
        }

    }
}