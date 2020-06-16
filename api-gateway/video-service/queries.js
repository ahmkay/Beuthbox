module.exports = `
videos(filter: VideoFilterPanel): [Video!]!,
video(id: String!): Video,
channelVideoViewCount(id: String!): ChannelVideoViewCount,
channelVideoCount(id: String!): ChannelVideoCount,
sliders: [Slider!]!,
slidersLight: [SliderLight!]!
slider(id: String!): Slider,
sliderLight(id: String!): SliderLight,
`;