import praw
import pandas as pd
import matplotlib.pyplot as plt
import networkx as nx

reddit = praw.Reddit(
    user_agent="Comment Extraction (by u/landsharkxx)",
    client_id="",
    client_secret="",
    username="",
    password=""
)

def get_posts(sub_name, n):
    subreddit = reddit.subreddit(sub_name)
    posts_list = [] 
    
    for submission in subreddit.top(limit=n):
        info_list = []
        info_list.append(submission.id)   # Output: the submission's title
        info_list.append(submission.score)  # Output: the submission's score  
        info_list.append(str(submission.author)) 
        info_list.append(submission.num_comments)
        info_list.append(submission.subreddit)
        posts_list.append(info_list)
    
    a = sorted(posts_list, key=lambda x: x[1], reverse = True)
    posts_df = pd.DataFrame(a, columns = ['id', 'score', 'author', 'num_comments', 'subreddit'])
    return posts_df

def get_comments(subm_id, n): 
    
    com_list = []
    submission = reddit.submission(id = subm_id)
    i = 0
    for comment in submission.comments:
        info_list = []
            # Top 3 comments for each submission
        if i <= n:
            info_list.append(comment.id)
            info_list.append(comment.score)
            info_list.append(comment.author)
            info_list.append(submission.subreddit)
            #info_list.append(submission.comments.list()[i].body)
            i += 1
            com_list.append(info_list)
        else:
            break
    
    a = sorted(com_list, key=lambda x: x[1], reverse = True)
    com_df = pd.DataFrame(a)
    return com_df

def get_user_posts(author, n):
    
    redditor = reddit.redditor(author)
    user_posts_list = []
    
        
    for submission in redditor.submissions.top(limit = n):
            info_list = []
            info_list.append(submission.id)
            info_list.append(submission.score)
            info_list.append(str(submission.author))
            info_list.append(submission.num_comments)
            info_list.append(str(submission.subreddit))
            user_posts_list.append(info_list)
            
    a = sorted(user_posts_list, key=lambda x: x[1], reverse = True)
    user_posts_df = pd.DataFrame(a)
    return user_posts_df

def getUsed(user):
    
    red = reddit.redditor(user)
    subs = {}
    for comment in red.comments.new():
        co = comment
        sub = str(co.subreddit)
        try:
            subs[sub] += 1
        except:
            subs[sub] = 1
    sort = sorted(subs, key = subs.get)
    sorted_dict = {}
    
    for w in sort:
        sorted_dict[w] = subs[w]
    
    mostpop = list(sorted_dict.items())[-1][0]
    return mostpop, sorted_dict

df = get_posts('all', 1000)
###

userused = getUsed('jemsbhai')

###
def getGraph(subreddit):
    target_df = get_posts(subreddit, 500) # This is where you can define any subreddit and 
    repeating = target_df[target_df.duplicated(['author'], keep = False)] # Only take users who posted more than once
    repeating = repeating[repeating.author != 'None'] # Get rid of deleted users
    
    u_authors = list(repeating.author.unique())
    authors_df =  pd.DataFrame() # Makes an empty dataframe
    authors_df = authors_df.fillna(0)
    for u in u_authors: # Loops through every "influencer" user and gets 10 top posts per user
        try:
            c = get_user_posts(u, 10)
        except:
            print(u)
            indie = u_authors.index(u)
            del u_authors[indie]
        authors_df = pd.concat([authors_df, c])
    authors_df = authors_df.rename(index=str, #renaming column names 
                                   columns={0: "id", 1: "score", 2: "author", 3: "num_comments", 4: "subreddit"})
    n_df = authors_df[['author', 'subreddit']] # Create a dataframe for network graph purposes 
    global g                       
    g = nx.from_pandas_edgelist(n_df, source='author', target='subreddit') # Initial ugly approach, decided to keep it
    subs = list(n_df.subreddit.unique()) # Make list of unique subreddits to use in network graph
    ###############################
    #IF YOU WANT TO SEE THE GRAPH:# 
    ###############################
    
    
    ###plt.figure(figsize=(25, 25))
    
    # Create the graph from the dataframe
    ###g = nx.from_pandas_edgelist(n_df, source='author', target='subreddit') 
    # Create a layout for nodes 
    ###layout = nx.spring_layout(g,iterations=50,scale=2)
    #
    ## Draw the parts we want, edges thin and grey
    ## Influencers appear small and grey
    ## Subreddits appear in blue and sized according to their respective number of connections.
    ## Labels for subreddits ONLY
    ## People who have more connections are highlighted in color 
    #
    ## Go through every subbreddit, ask the graph how many connections it has. 
    ## Multiply that by 80 to get the circle size
    ###sub_size = [g.degree(sub) * 80 for sub in subs]
    ###nx.draw_networkx_nodes(g, 
    ###                       layout, 
    ###                       nodelist=subs, 
    ###                       node_size=sub_size, # a LIST of sizes, based on g.degree
    ###                       node_color='lightblue')
    #
    ## Draw all the entities
    ###try:
    ###    nx.draw_networkx_nodes(g, layout, nodelist=u_authors, node_color='#cccccc', node_size=100)
    ###except:
    ###    pass
    
    #
    ###nx.draw_networkx_edges(g, layout, width=1, edge_color="#cccccc")
    #
    ###node_labels = dict(zip(subs, subs)) #labels for subs
    ###nx.draw_networkx_labels(g, layout, labels=node_labels)
    #
    ## No axis needed
    ###plt.axis('off')
    ###plt.title("Network Graph of Related Subreddits")
    ###plt.savefig("NetworkGraph", bbox_inches='tight',pad_inches=0.5)
    ###plt.show()
    
    return g, subs
userused, mostcommon = getUsed('landsharkxx')
munuser, munmostcommon = getUsed('jemsbhai')
graph1, gsub = getGraph(userused)
graph2, g2sub = getGraph(munuser)
#graph1.degree('college')

user1 = set(mostcommon.keys())
user2 = set(munmostcommon.keys())
z = user1.intersection(user2)
#print(z)
gsset = set(gsub)
gsset2 = set(g2sub)
gsinter = gsset.intersection(gsset2)
#print(gsinter)

def similarity(UserInter, SubInter, graph1, graph2):
    score = 1000
    subdd = 100
    for ui in UserInter:
        subreddi = reddit.subreddit(ui).subscribers
        sscore = 1000000*(int(subdd)/int(subreddi))
        score = score - sscore
    for si in SubInter:
        links = graph1.degree(si)
        skinl = graph2.degree(si)
        if links > skinl:
            linkvalue = links
        else:
            linkvalue = skinl
        multiplier = 100000/linkvalue
        subreddi2 = reddit.subreddit(si).subscribers
        siscore = multiplier*(int(subdd)/int(subreddi2))
        score = score - siscore
    if score < 0:
        score = 0 
    print('final: ', int(score))
similarity(z, gsinter, graph1, graph2)
