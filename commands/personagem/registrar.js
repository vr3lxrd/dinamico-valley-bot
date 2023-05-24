const { SlashCommandBuilder } = require('discord.js');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'valley_database',
  password: '1103',
  port: 5432,
})

module.exports = {
	data: new SlashCommandBuilder()
		.setName('registrar')
		.setDescription('Registre seu personagem!')
		.addStringOption(option => 
			option.setName('nome')
				.setDescription('Como você quer ser identificado')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('classe')
				.setDescription('A classe que deseja utilizar')
				.setRequired(true)
				.addChoices(
					{name: "Fazendeiro", value: "1"},
					{name: "Minerador", value: "2"},
					{name: "Aventureiro", value: "3"},
					{name: "Pescador", value: "4"},
				)
			),
	async execute(interaction) {
		const nome = interaction.options.getString('nome')
		const classe = interaction.options.getString('classe')
		const id = interaction.user.id
		const select = await pool.query("SELECT discord_id, person_name FROM valley_persons WHERE discord_id = $1",[id])
		if (select.rowCount != 0) {
			await interaction.reply(`Você já se registrou uma vez, quer trocar de personalidade **${select.rows[0].person_name}**?`);
			return
		}
		pool.query("INSERT INTO valley_persons(discord_id, class_id, person_name)VALUES ($1, $2, $3) on conflict (discord_id) do nothing",[id, classe, nome])
		console.log(nome, classe, id)
		await interaction.reply(`A pessoa ${interaction.user} se registrou como ${nome}!`);
	},
};