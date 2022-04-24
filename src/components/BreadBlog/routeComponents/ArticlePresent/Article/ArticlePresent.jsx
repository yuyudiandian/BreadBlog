import React, {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Card, Divider,Skeleton} from "antd";
import TimeShow from "../../../utilsComponents/Present/TimeShow";
import ArticlePresentHeader from "./ArticlePresentHeader";
import ArticleActionNav from "./ArticleActionNav";
import ArticleContent from "./ArticleContent";
import MarkDownContent from "./MarkDownContent";
import CommentsList from "../Comment/CommentsList";
import NotFoundPage from "../../../utilsComponents/Present/NotFoundPage";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
export default function ArticlePresent(props) {

	const [search,setSearch] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState({title:'',authorname:'',sortname:'',tags:[],content:'',createdtime:'',type:'',commentsid:''})
	const [loading,setLoading] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})

	useEffect(()=>{
		let articleid = search.get('articleid')
		if (!articleid) {
			setError({status: true,errText: '文章ID为空'})
		}else {
			PublicDataRequest.getArticleInfo(articleid).then(result => {
				if (result?.Ok){
					setArticleInfo(result.ArticleInfo)
					setLoading(false)
				}else {
					setError({status: true,errText:result.Msg})
				}
			})
		}
	},[])

	return (
		<Fragment>
			{!isError.status ? <div className='article-present-container'>
				<div className='article-action-nav'>
					{!loading && <ArticleActionNav articleid={search.get('articleid')}/>}
				</div>
				<div className='article-present-major-container'>
					<Skeleton active loading={loading}>
						<Card title={ArticleInfo.title}>
							<div className='article-show-container'>
								<div className='article-author-header'>
									<ArticlePresentHeader ArticleInfo={ArticleInfo}/>
								</div>
								<Divider/>
								<div id='pdf_viewer'>
									{ArticleInfo.type === 'markdown' ?
										<MarkDownContent content={ArticleInfo.content}/> :
										<ArticleContent content={ArticleInfo.content}/>
									}
								</div>
							</div>
						</Card>
					</Skeleton>
					<Card>
						<div className='article-comment-container'>
							<Skeleton active loading={loading}>
								<CommentsList articleid={search.get("articleid")} commentsid={ArticleInfo.commentsid}/>
							</Skeleton>
						</div>
					</Card>
				</div>
				<div className='article-minor-container'>
					<TimeShow/>
				</div>
			</div> : <NotFoundPage errText={isError.errText}/>}
		</Fragment>
	);
}
