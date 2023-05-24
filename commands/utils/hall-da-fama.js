const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hall-da-fama')
		.setDescription('Essa postagem merece um lugar no Hall da Fama?')
        .setDMPermission(false)
        .addStringOption(option => 
			option.setName('mensagem')
				.setDescription('URL da mensagem/post candidato')
				.setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */    
	async execute(interaction) {

        console.log(interaction.user)

        const pollEmbed = new EmbedBuilder()
            .setTitle("Votação Popular")
            .setDescription("Essa mensagem deveria ir para o hall da fama?")
            .setAuthor({ name: interaction.user.username})
            .addFields([
                {name: "Mensagem candidata", value: interaction.options.getString('mensagem')},
                {name: "Sim!", value: "0", inline: true},
                {name: "Não", value: "0", inline: true}
            ])
            .setColor('Blue');

        const replyObject = await interaction.reply({embeds: [pollEmbed], fetchReply: true})

        const yes = new ButtonBuilder()
            .setCustomId(`Poll-Yes-${replyObject.id}`)
            .setLabel('Sim!')
            .setStyle(ButtonStyle.Success);

        const no = new ButtonBuilder()
            .setCustomId(`Poll-No-${replyObject.id}`)
            .setLabel('Não')
            .setStyle(ButtonStyle.Danger);

        const pollButtons = new ActionRowBuilder()
            .addComponents(yes, no);

       interaction.editReply({components: [pollButtons]})

	},
};